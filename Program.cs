using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using System.IO;
using System.Collections.Specialized;
using System.Net;
using System.Security.Cryptography;
using Org.BouncyCastle.Crypto.Digests;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Encodings;
using Org.BouncyCastle.Crypto.Engines;
using Org.BouncyCastle.OpenSsl;
using System.Text.RegularExpressions;

namespace ConsoleApp1
{
    class Response
    {
        public string success { get; set; }
        public string error { get; set; }
        public string data { get; set; }
    }

    class Program
    {
        public static string httpRequest(string url, string method, string json)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = method;

            if (method == "POST")
            {
                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    streamWriter.Write(json);
                }
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
                return result;
            }
        }

        public static string RsaEncrypt(string publicKey, string text)
        {
            var plain = Encoding.UTF8.GetBytes(text);

            Org.BouncyCastle.Crypto.Parameters.RsaKeyParameters rsaPub;
            using (var txtreader = new StringReader(publicKey))
            {        
                rsaPub = (Org.BouncyCastle.Crypto.Parameters.RsaKeyParameters)new PemReader(txtreader).ReadObject();
            }
            
            var encrypter = new OaepEncoding(new RsaEngine(), new Sha1Digest(), new Sha1Digest(), null);
            encrypter.Init(true, rsaPub);
            var cipher = encrypter.ProcessBlock(plain, 0, plain.Length);
            return Convert.ToBase64String(cipher);
        }

        public static string RsaDecrypt(string privateKey, string base64Input)
        {
            var bytesToDecrypt = Convert.FromBase64String(base64Input);

            AsymmetricCipherKeyPair rsaPriv;
            using (var txtreader = new StringReader(privateKey))
            {
                rsaPriv = (AsymmetricCipherKeyPair)new PemReader(txtreader).ReadObject();
            }

            var decrypter = new OaepEncoding(new RsaEngine(), new Sha1Digest(), new Sha1Digest(), null);
            decrypter.Init(false, rsaPriv.Private);
            var decrypted = Encoding.UTF8.GetString(decrypter.ProcessBlock(bytesToDecrypt, 0, bytesToDecrypt.Length));
            return decrypted;
        }

        public static string AesEncrypt(string plainText, string keyString)
        {
            byte[] cipherData;
            Aes aes = Aes.Create();
            aes.Key = Convert.FromBase64String(keyString);
            aes.GenerateIV();
            aes.Mode = CipherMode.CBC;
            ICryptoTransform cipher = aes.CreateEncryptor(aes.Key, aes.IV);

            using (MemoryStream ms = new MemoryStream())
            {
                using (CryptoStream cs = new CryptoStream(ms, cipher, CryptoStreamMode.Write))
                {
                    using (StreamWriter sw = new StreamWriter(cs))
                    {
                        sw.Write(plainText);
                    }
                }

                cipherData = ms.ToArray();
            }

            byte[] combinedData = new byte[aes.IV.Length + cipherData.Length];
            Array.Copy(aes.IV, 0, combinedData, 0, aes.IV.Length);
            Array.Copy(cipherData, 0, combinedData, aes.IV.Length, cipherData.Length);
            return Convert.ToBase64String(combinedData);
        }

        public static string AesDecrypt(string combinedString, string keyString)
        {
            string plainText;
            byte[] combinedData = Convert.FromBase64String(combinedString);
            Aes aes = Aes.Create();
            aes.Key = Encoding.UTF8.GetBytes(keyString);
            byte[] iv = new byte[aes.BlockSize / 8];
            byte[] cipherText = new byte[combinedData.Length - iv.Length];
            Array.Copy(combinedData, iv, iv.Length);
            Array.Copy(combinedData, iv.Length, cipherText, 0, cipherText.Length);
            aes.IV = iv;
            aes.Mode = CipherMode.CBC;
            ICryptoTransform decipher = aes.CreateDecryptor(aes.Key, aes.IV);

            using (MemoryStream ms = new MemoryStream(cipherText))
            {
                using (CryptoStream cs = new CryptoStream(ms, decipher, CryptoStreamMode.Read))
                {
                    using (StreamReader sr = new StreamReader(cs))
                    {
                        plainText = sr.ReadToEnd();
                    }
                }

                return plainText;
            }
        }

        static void Main(string[] args)
        {
            //string json = "{\"username\":\"Andrej\"}";
            //httpRequest("http://localhost:3000/api/createUser", "POST", json);
            
            string jsonPublic = httpRequest("http://localhost:3000/api/getPublicKey/Andrej", "GET", "");
            string jsonPrivate = httpRequest("http://localhost:3000/api/getPrivateKey/Andrej", "GET", "");
            string publicKey = Newtonsoft.Json.JsonConvert.DeserializeObject<Response>(jsonPublic).data;
            string privateKey = Newtonsoft.Json.JsonConvert.DeserializeObject<Response>(jsonPrivate).data;



            Console.Read();
        }
    }
}

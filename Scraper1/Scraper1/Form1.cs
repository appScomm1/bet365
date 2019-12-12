using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Scraper1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();

            IWebDriver driver;

            driver = new ChromeDriver("C:\\Users\\PCLavoro\\source\\repos\\Scraper1\\Scraper1\\Resources\\");
            driver.Url = "https://www.eurobet.it/it/scommesse/#!/calcio/?temporalFilter=TEMPORAL_FILTER_OGGI";
            driver.Navigate();
            //IWebElement body = driver.FindElement(By.("body"));
            //IWebElement body = driver.FindElement(By.ClassName("page"));


            /***************************************************************************************
             * Prende tutti i nomi delle partite
             **************************************************************************************/


            /*ReadOnlyCollection<IWebElement> body = driver.FindElements(By.ClassName("event-players"));

            foreach (IWebElement element in body)
            {
                textBox1.Text += element.Text+"\n";
            }*/

            /***************************************************************************************
             * Prende tutti i link delle partite
             **************************************************************************************/

            /*ReadOnlyCollection<IWebElement> body = driver.FindElements(By.TagName("a"));

            foreach (IWebElement element in body)
            {
                try
                {
                    if (element.GetAttribute("href").Contains("#!/calcio/"))
                    {
                        textBox1.Text += element.GetAttribute("href") + "\n";
                    }
                }
                catch (Exception e)
                { }
            }*/

            /***************************************************************************************
             * Prende il nome della divisione della partita
             **************************************************************************************/

            /*driver.Url = "https://www.eurobet.it/it/scommesse/#!/calcio/es-tercera-division/cd-lealtad-condal-club-201912111545";
            driver.Navigate();

            ReadOnlyCollection<IWebElement> body1 = driver.FindElements(By.ClassName("title-event"));


            foreach (IWebElement element in body1)
            {
                try
                {
                    if (element.GetAttribute("href").Contains("#!/calcio/"))
                    {
                        textBox1.Text += element.Text + "\n";
                    }
                }
                catch (Exception e)
                { }
            }*/

            /***************************************************************************************
             * Prende le due squadre che giocano, devo però avere la squadra in casa
             **************************************************************************************/

            /*driver.Url = "https://www.eurobet.it/it/scommesse/#!/calcio/es-tercera-division/cd-lealtad-condal-club-201912111545";
            driver.Navigate();

            ReadOnlyCollection<IWebElement> body1 = driver.FindElements(By.ClassName("title-event"));


            foreach (IWebElement element in body1)
            {
                try
                {
                    if (element.Text.Contains("Cd Lealtad"))
                    {
                        textBox1.Text += element.Text + "\n";
                    }
                }
                catch (Exception e)
                { }
            }*/

            /***************************************************************************************
             * Prende la quota dell'1X2
             **************************************************************************************/

            /*driver.Url = "https://www.eurobet.it/it/scommesse/#!/calcio/es-tercera-division/ca-tacoronte-tenisca-201912111700";
            driver.Navigate();

            ReadOnlyCollection<IWebElement> body1 = driver.FindElements(By.ClassName("containerQuota"));


            foreach (IWebElement element in body1)
            {
                if(element.Text.Contains("1\r\n"))
                {
                    textBox1.Text += "1: " + element.Text.Replace("1\r\n", "") + "\n";
                }else if (element.Text.Contains("X\r\n"))
                {
                    textBox1.Text += "X: " + element.Text.Replace("X\r\n", "")+"\n";
                }
                else if (element.Text.Contains("2\r\n"))
                {
                    textBox1.Text += "2: " + element.Text.Replace("2\r\n", "") + "\n";
                }
            }*/


            /***************************************************************************************
             * Prende
             **************************************************************************************/
            List<String> link = new List<string>();
            List<String[]> squadre = new List<string[]>();
            ReadOnlyCollection<IWebElement> WebElementLink = driver.FindElements(By.TagName("a"));
            ReadOnlyCollection<IWebElement> WebElementSquadre = driver.FindElements(By.ClassName("event-players"));
            string splitsquadre = "\r\n";
            
            foreach (IWebElement element in WebElementSquadre)
            {
                String[] strsquadre = Regex.Split(element.Text,splitsquadre);
                squadre.Add(strsquadre);
            }

            foreach (IWebElement element in WebElementLink)
            {
                try
                {
                    if (element.GetAttribute("href").Contains("#!/calcio/"))
                    {
                        link.Add(element.GetAttribute("href"));
                    }
                }
                catch (Exception e)
                { }
            }

            int i = 0;
            foreach (String linkstr in link)
            {
                driver.Url = linkstr;
                driver.Navigate();
                //WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(4));

                WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(0.5)); // Wait for 4 seconds.
                wait.Until(ExpectedConditions.VisibilityOfAllElementsLocatedBy(By.ClassName("title-event")));

                ReadOnlyCollection<IWebElement> WebElementSquadre1 = driver.FindElements(By.ClassName("title-event"));


                foreach (IWebElement element in WebElementSquadre1)
                {
                    try
                    {
                            if (element.Text.Contains(squadre[i][0]))
                            {
                                textBox1.Text += element.Text + Environment.NewLine;
                            }
                    }
                    catch (Exception e)
                    { }
                }

                ReadOnlyCollection<IWebElement> WebElementQuote = driver.FindElements(By.ClassName("containerQuota"));


                foreach (IWebElement element in WebElementQuote)
                {
                    if (element.Text.Contains("1\r\n"))
                    {
                        textBox1.Text += "1: " + element.Text.Replace("1\r\n", "") + Environment.NewLine;
                    }
                    else if (element.Text.Contains("X\r\n"))
                    {
                        textBox1.Text += "X: " + element.Text.Replace("X\r\n", "") + Environment.NewLine;
                    }
                    else if (element.Text.Contains("2\r\n"))
                    {
                        textBox1.Text += "2: " + element.Text.Replace("2\r\n", "") + Environment.NewLine;
                    }
                }
                break;
                i++;
            }
        }
    }
}

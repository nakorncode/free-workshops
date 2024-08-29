import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

interface Book {
  title: string;
  price: number;
}

const BASE_URL = 'https://books.toscrape.com/';
const books: Book[] = [];
let pageCount = 0;

const scrapePage = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    pageCount++;
    console.log(`Scraping page ${pageCount}...`);

    $('.product_pod').each((_idx, el) => {
      const title = $(el).find('h3 a').attr('title') || '';
      const priceText = $(el).find('.price_color').text();
      const price = parseFloat(priceText.replace('£', ''));

      books.push({ title, price });
    });

    const nextPageUrl = $('.next a').attr('href');
    if (nextPageUrl) {
      const nextPageFullUrl = nextPageUrl.startsWith('catalogue/')
        ? `${BASE_URL}${nextPageUrl}`
        : `${BASE_URL}catalogue/${nextPageUrl}`;

      await scrapePage(nextPageFullUrl);
    }
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
  }
};

const saveToCSV = (data: Book[]) => {
  // Enclose titles in double quotes to handle commas within titles
  const csvData = data.map(book => `"${book.title.replace(/"/g, '""')}",${book.price}`).join('\n');
  const csvHeader = 'Title,Price\n';
  const filePath = path.join(__dirname, 'books.csv');

  fs.writeFileSync(filePath, csvHeader + csvData, 'utf-8');
  console.log(`Scraping complete. Data saved to ${filePath}`);
};

const main = async () => {
  console.log('Starting web scraping...');
  await scrapePage(BASE_URL);
  saveToCSV(books);
};

main();

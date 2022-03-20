import { Client, MessageEmbed } from "discord.js";
import Web3 from "web3";
import { fetchJson } from 'fetch-json';
require("dotenv").config();

const AUTHOR = "JD, Tebogo";
const BOT_NAME = "La senyorita Aurora";
const BOT_NAME_FOOTER = "La senyorita Aurora";
const EMBED_COLOR_PRIMARY = 0x32a852;
const EMBED_COLOR_SECONDARY = 0xffffff;
const IMAGE_DEFAULT = "https://i.imgur.com/RGtv8h0.png";
const LOGO = "https://i.imgur.com/RGtv8h0.png";
const URL_BOT = "https://aurora.dev/";
const MNEMONIC = process.env.MNEMONIC;
const SENDER_ADDRESS = '0x302b9672642c26EF7b5B6c53df592A20EcB0FDe3'
const TOKEN_NAME = 'AURORA'
console.log(`Starting bot...`);
console.log(`Connecting web3 to ..`);
console.log('Api ' + process.env.API_KEY)

const client: Client = new Client();
const web3 = new Web3(process.env.RPC_URL);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on("message", async (msg) => {
  try {
    const args = msg.content.slice("!".length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    // test_address = 0x302b9672642c26EF7b5B6c53df592A20EcB0FDe3
    if (command === "balance") {
      const url = `https://api-testnet.aurorascan.dev/api?module=account&action=balance&address=${args[0]}&tag=latest&apikey= ` + process.env.API_KEY;
      const data = await fetchJson.get(url);

      const accountBalance = data.result
      const msgEmbed = new MessageEmbed()
        .setColor(EMBED_COLOR_PRIMARY)
        .setDescription(BOT_NAME)
        .setURL(URL_BOT)
        .setAuthor("Authors: " + AUTHOR, IMAGE_DEFAULT, URL_BOT)
        .setThumbnail(LOGO)
        .addField("Current account balance", `${accountBalance}` + ` ${TOKEN_NAME}`)
        .setImage(LOGO)
        .setFooter(BOT_NAME_FOOTER, IMAGE_DEFAULT)
        .setTimestamp();
      msg.channel.send(msgEmbed);

      client.user.setActivity("tokens", { type: "WATCHING" });
      // client.user.setAvatar(IMAGE_DEFAULT)
    }
    if (command === "totalsupply") {
      const url = 'https://api-testnet.aurorascan.dev/api?module=stats&action=ETHsupply&apikey=' + process.env.API_KEY;
      const data = await fetchJson.get(url);

      const totalSupplyAurora = data.result
      const msgEmbed = new MessageEmbed()
        .setColor(EMBED_COLOR_PRIMARY)
        .setDescription(BOT_NAME)
        .setURL(URL_BOT)
        .setAuthor("Authors: " + AUTHOR, IMAGE_DEFAULT, URL_BOT)
        .setThumbnail(LOGO)
        .addField("Total Aurora supply: ", `${totalSupplyAurora}` + ` ${TOKEN_NAME}`)
        .setImage(LOGO)
        .setFooter(BOT_NAME_FOOTER, IMAGE_DEFAULT)
        .setTimestamp();
      msg.channel.send(msgEmbed);

      client.user.setActivity("tokens", { type: "WATCHING" });
      // client.user.setAvatar(IMAGE_DEFAULT)
    }

    if (command === "transactions") {
      // 
      const url = 'https://api-testnet.aurorascan.dev/api?module=account&action=txlist&address=0x0000000000000000000000000000000000001004&startblock=1&endblock=99999999&sort=asc&apikey=' + process.env.API_KEY;
      const data = await fetchJson.get(url);
      let message = "No transactions found."

      console.log(data.message)


      const msgEmbed = new MessageEmbed()
        .setColor(EMBED_COLOR_PRIMARY)
        .setDescription(BOT_NAME)
        .setURL(URL_BOT)
        .setAuthor("Author: " + AUTHOR, IMAGE_DEFAULT, URL_BOT)
        .setThumbnail(LOGO)
        .addField("Transactions: ", ` ${message}`)
        .setImage(LOGO)
        .setFooter(BOT_NAME_FOOTER, IMAGE_DEFAULT)
        .setTimestamp();
      msg.channel.send(msgEmbed);

      client.user.setActivity("tokens", { type: "WATCHING" });
      // client.user.setAvatar(IMAGE_DEFAULT)
    }

  } catch (e) {
    msg.reply("ERROR");
    console.log(new Date().toISOString(), "ERROR", e.stack || e);
  }
});

client.login(process.env.DISCORD_TOKEN);

import { run } from "./utils/rin.js";
import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import { postData } from "./dataControls/postData.js"
import { getData } from "./dataControls/getData.js"

let token = process.env.TOKEN;
let bot = new TelegramBot(token, { polling: true });
let id = process.env.ID_TELE

let minuteIf = Math.round(Math.random()*9)
let secondsIf = Math.floor(Math.random()*59)

setInterval(() => {
  let date = new Date()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let seconds = date.getSeconds()
  let day = date.getDay()
  //eksekusi
  if(minute%5 == 1) {
    run("")
    .then(res => console.log("AI berhasil tersambung pada pukul " + hour + ":" + minute))
    .catch(err => {
      console.log("AI gagal tersambung pada pukul " + hour + ":" + minute)
      console.log(err)
    })
    }
  // tidur 
  if(hour == 0 && minute == 10+minuteIf) {
    run("Model bertanya kepada user sedang berbuat apa ")
    .then(res => {
      let cleanedRes = res.replace(/\n/g, "");
      cleanedRes = res.replace(/\s+/g," ").trim()
      cleanedRes = cleanedRes.replace(/\bRin\b/gi, "Aku")
      bot.sendMessage(id,cleanedRes)
      console.log("AI berhasil tereksekusi")
    })
    minuteIf = 45 + (Math.round(Math.random()*15))
    secondsIf = Math.round(Math.random()*60)
  }
  //malam minggu
  else if(day == 6 && hour == 15 && minute == (20+(Math.round(Math.random()*15)))) {
    run("Model bertanya lagi ngapain ke user ")
    .then(res => {
      let cleanedRes = res.replace(/\n/g, "");
      cleanedRes = res.replace("Aku sayang kamu", "Love you")
      cleanedRes = res.replace("aku sayang kamu", "Love you")
      //postData("model", cleanedRes);
      bot.sendMessage(id,cleanedRes)
      console.log("AI berhasil tereksekusi")
    })
    minuteIf = Math.round(Math.random()*9)
    secondsIf = Math.round(Math.random()*60)
    day = 7
  }
  //selamat pagi 
  else if(hour == 9 && minute == (30+minuteIf)) {
    run("Model memberikan ucapan selamat pagi ke user dan memberikan semangat kepada user serta bertanya kepada user lagi ngapain")  
    .then(res => {
      let cleanedRes = res.replace(/\n/g, "");
      cleanedRes = res.replace("Aku sayang kamu", "Love you")
      cleanedRes = res.replace("aku sayang kamu", "Love you")
      //postData("model", cleanedRes);
      bot.sendMessage(id,cleanedRes)
      console.log("AI berhasil tereksekusi")
    })
    minuteIf = 15 + (Math.round(Math.random()*9))
    secondsIf = Math.round(Math.random()*60)
  }
  //sholat jumat 
  else if(day == 5 && hour == 12 && minute == 9+minuteIf) {
    run("Model mengingatkan user agar tidak lupa sholat Jumat dan makan siang")  
    .then(res => {
      let cleanedRes = res.replace(/\n/g, "");
      cleanedRes = res.replace("Aku sayang kamu", "Love you")
      cleanedRes = res.replace("aku sayang kamu", "Love you")
      //postData("model", cleanedRes);
      bot.sendMessage(id,cleanedRes)
      console.log("AI berhasil tereksekusi")
    })
    minuteIf = Math.round(Math.random()*9)
    secondsIf = Math.round(Math.random()*60)
  }
  //sholat zuhur
  else if(hour == 12 && minute == minuteIf) {
    run("Model mengingatkan user agar tidak lupa sholat Zuhur dan makan siang")  
    .then(res => {
      let cleanedRes = res.replace(/\n/g, "");
      cleanedRes = res.replace("Aku sayang kamu", "Love you")
      cleanedRes = res.replace("aku sayang kamu", "Love you")
     // postData("model", cleanedRes);
      bot.sendMessage(id,cleanedRes)  
      console.log("AI berhasil tereksekusi")
    })
    minuteIf = Math.round(Math.random()*9)
    secondsIf = Math.round(Math.random()*60)
    }
  //sholat magrib
  else if(hour == 18 && minute == minuteIf ) {
    run("Model mengingatkan user agar tidak lupa sholat magrib dan makan malam")  
    .then(res => {
      let cleanedRes = res.replace(/\n/g, "");
      cleanedRes = res.replace("Aku sayang kamu", "Love you")
      cleanedRes = res.replace("aku sayang kamu", "Love you")
      //postData("model", cleanedRes);
      bot.sendMessage(id,cleanedRes)
      console.log("AI berhasil tereksekusi")
    })
    minuteIf = Math.round(Math.random()*9)
    secondsIf = Math.round(Math.random()*60)
  }
},6000)

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  let text = msg.text;
  run(text)
  .then(res => {
    let cleanedRes = res.replace(/\n/g, "");
    cleanedRes = res.replace(/\s+/g," ").trim()
    // cleanedRes = cleanedRes.replace(/\bKamu\b/gi, "lu")
    // cleanedRes = cleanedRes.replace(/\bAku\b/gi, "gw")
    //cleanedRes = cleanedRes.replace(/\bSaya\b/gi, "gw")
    cleanedRes = cleanedRes.replace(/\bRin\b/gi, "Aku")
    postData("model", cleanedRes);
    postData("user", text);
    bot.sendMessage(chatId, cleanedRes);
  })
  .catch(err => console.error(err));
});

import supabase from "../database.js";

export async function getData() {
  let getData = await supabase.from("Lulu").select();
  let data = getData.data;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < (data.length - i - 1); j++) {
      if (data[j].id > data[j + 1].id) {
        let temp = data[j]
        data[j] = data[j + 1]
        data[j + 1] = temp
        }
      }
  }
  const dataLulu= await supabase.from('Lulu').select('*').eq('role', 'model')
  
  let datas = [{
    role:"user",
    text:"Nama saya rian dan saya pria"
  }]

  return datas.map(data => {
    let ai = {
      role:data.role,
      parts:[{
        text:data.text
      }]
    }
    return ai
  })
}
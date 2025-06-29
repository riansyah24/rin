import supabase from "../database.js";

export async function getData() {
  let getData = await supabase.from("Rinara").select();
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
  const datas= await supabase.from('Rinara').select('*').eq('role', 'model')

  return data.map(data => {
    let ai = {
      role:data.role,
      parts:[{
        text:data.text
      }]
    }
    return ai
  })
}
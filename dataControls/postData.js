import supabase from "../database.js"

export async function postData(role,text) {
  let postData = await supabase.from("Rinara").insert({
    role:role,
    text:text
  })
  return postData
}
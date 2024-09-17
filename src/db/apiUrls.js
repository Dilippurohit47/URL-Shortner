import supabase from "./supabase";

export const getUrls = async (user_id) => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id",user_id);


  if (error){
    console.log(error.message)
    throw new Error("uanble to load urls");

  }
  return data
};

import supabase from "./supabase";

export const getClicks = async (urlIds) => {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.log(error.message);
    throw new Error("uanble to load clicks");
  }
  return data;
};

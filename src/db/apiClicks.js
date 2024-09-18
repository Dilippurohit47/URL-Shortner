import supabase from "./supabase";

export const getClicks = async (urlIds) => {
  const { data, error } = await supabase
    .from("Clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.log(error.message);
    throw new Error("uanble to load clicks");
  }
  return data;
};


export async function getClicksForUrls(urlIds) {
  const {data, error} = await supabase
    .from("Clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error("Error fetching clicks:", error);
    return null;
  }

  return data;
}

export async function getClicksForUrl(url_id) {
  const {data, error} = await supabase
    .from("Clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load Stats");
  }

  return data;
}

import { UAParser } from "ua-parser-js";
import supabase, { supabaseUrl } from "./supabase";

export const getUrls = async (user_id) => {
  const { data, error } = await supabase
    .from("Urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.log(error.message);
    throw new Error("uanble to load urls");
  }
  return data;
};

export const deleteUrl = async (id) => {
  const { data, error } = await supabase.from("Urls").delete().eq("id", id);

  if (error) {
    console.log(error.message);
    throw new Error("uanble to load urls");
  }
  return data;
};
export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrcode
) {
  const short_url = Math.random().toString(36).substr(2, 6);
  const fileName = `qr-${short_url}`;

  const { error: storageError } = await supabase.storage
    .from("Qr")
    .upload(fileName, qrcode);

  if (storageError) throw new Error(storageError.message);

  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

  const { data, error } = await supabase
    .from("Urls")
    .insert([
      {
        title,
        user_id,
        original_url: longUrl,
        custom_url: customUrl || null,
        short_url,
        qr,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error creating short URL");
  }

  return data;
}

const parser = new UAParser();

export const storeClicks = async ({ id, originalUrl }) => {
  try {
    const res = parser.getResult();
    const deivce = res.type || "desktop";

    const response = await fetch("https://ipapi.co/json");
    const { city, counrty_name: country } = await response.json();

    await supabase.from("Clicks").insert({
      url_id: id,
      city: city,
      country: country,
      deivce,
    });
    window.location.href = originalUrl;
  } catch (error) {
    console.log("Error recording clicks");
  }
};

export async function getUrl({ id, user_id }) {
  const { data, error } = await supabase
    .from("Urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Short Url not found");
  }

  return data;
}

export async function getLongUrl(id) {

  let {data: shortLinkData, error: shortLinkError} = await supabase
  .from("Urls")
  .select("id, original_url")
  .or(`short_url.eq.${id},custom_url.eq.${id}`)
  .single();

  if (shortLinkError) {
    if (shortLinkError.code === "PGRST116") {
      console.error("No short link found for the given ID");
      return null; // You can handle this as appropriate (e.g., show a 404 page)
    } else {
      // Other errors
      console.error("Error fetching short link:", shortLinkError);
      return null;
    }
  }

  // Log and return the fetched data
  console.log("Found short link:", shortLinkData);
  return shortLinkData;
}

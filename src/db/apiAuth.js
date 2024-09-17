import supabase from "./supabase";

export async function login({ email, password }) {
  console.log(email, password);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export const getUser = async () => {
  const { data: session, error } = await supabase.auth.getSession();

  if (!session.session) return null;
  if (error) throw new Error(error.message);
  return session.session.user;
};

export async function signUp({ name, email, profile_pic ,password}) {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `${supabase}/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

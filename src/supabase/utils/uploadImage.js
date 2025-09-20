import supabase from "../supabaseClient";
export const uploadImage = async (file) => {
  const bucketName = "issue_images";
  const filePath = `issues/${Date.now()}_${file.name}`;

  // Upload the file
  const { data: _uploadData, error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, { cacheControl: "3600", upsert: false });

  if (uploadError) throw uploadError;

  // Get the public URL
  const { data: urlData, error: urlError } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  if (urlError) throw urlError;

  return urlData.publicUrl;
};

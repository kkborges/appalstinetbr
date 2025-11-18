// Cloudinary upload configuration
export const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  apiKey: process.env.CLOUDINARY_API_KEY || "",
  apiSecret: process.env.CLOUDINARY_API_SECRET || "",
};

export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "marketplace"
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao fazer upload da imagem");
  }

  const data = await response.json();
  return data.secure_url;
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = await generateSignature(publicId, timestamp);

  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("api_key", cloudinaryConfig.apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/destroy`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao deletar imagem");
  }
}

async function generateSignature(
  publicId: string,
  timestamp: number
): Promise<string> {
  // This would need to be implemented on the server side for security
  // For now, we'll handle this in an API route
  const response = await fetch("/api/cloudinary/signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ publicId, timestamp }),
  });

  const data = await response.json();
  return data.signature;
}

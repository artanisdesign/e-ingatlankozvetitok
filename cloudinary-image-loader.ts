export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const CLOUDINARY_URL = "https://res.cloudinary.com/cc-images/image/upload/"
  //const URL = "https://res.cloudinary.com/cc-images/image/upload/"
  const URL = "https://imgs.e-ingatlanugyvedek.hu/cc-images/image/upload/"

  if (src.startsWith("/")) return src
  const _SRC = src.replace(CLOUDINARY_URL, "")


  const params = ["f_webp", "c_limit", `w_${width}`, `q_${quality || "75"}`]
  return `${URL}${params.join(",")}/${_SRC}`
}

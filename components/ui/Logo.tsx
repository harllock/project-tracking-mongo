import Image from "next/image"
import logo from "../../public/logo.png"

export const Logo: React.FC = () => {
  return (
    <Image
      alt="company logo"
      height={50}
      priority={true}
      src={logo}
      width={100}
    ></Image>
  )
}

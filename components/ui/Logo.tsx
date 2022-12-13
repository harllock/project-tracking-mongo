import Image from "next/image"
import logo from "../../public/logo.png"

export const Logo: React.FC = () => {
  return <Image alt="company logo" src={logo} width={100} height={50}></Image>
}

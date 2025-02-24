import { Divider } from "@mui/material"


const ProfileFiledCard = ({keys,value}:{keys:string, value:string}) => {
  return (
    <div className="p-5 flex items-center bg-slate-50">
        <p className="w-20 lg:w-36 pr-5">{keys}</p>
        <Divider flexItem orientation="vertical"/>
        <p className="pl-5 lg:pl-10 font-semibold lg:text-lg">{value}</p>
       

    </div>
  )
}

export default ProfileFiledCard
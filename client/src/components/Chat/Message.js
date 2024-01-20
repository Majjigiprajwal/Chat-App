import React,{useState} from 'react'

const Message = () => {

  const [message,setMessage] = useState(['i wanrt to dance jkjhfkj igg ifhgg ihigueg iehiug ehgie jhgre ehgeg jhgif ','i wanrt to dance ','i wanrt to dance ','i wanrt to dance ','i wanrt to dance ','i wanrt to dance ','i wanrt to dance '])
  
  return (
    <>
    {
      message.map((ms)=>{
        return     <div className="m-4 p-4 flex flex-col gap-5">
            <div className="w-full h-full flex flex-col items-end gap-5 ">
          <div className="max-w-2/5 bg-green-300 flex flex-col overflow-hidden whitespace-normal  p-4 rounded-tr-xl rounded-tl-xl rounded-bl-xl font-serif ">
                <p>prjwal</p>
                <p>{ms}</p>
             </div>
            </div>
            </div>
           
      })
    }
    </>
//     <div className="m-4 p-4 flex flex-col gap-5">
//     <div className="w-full h-full flex flex-col items-end gap-5 ">
//       <div className="max-w-2/5 bg-green-300 flex flex-col overflow-hidden whitespace-normal  p-4 rounded-tr-xl rounded-tl-xl rounded-bl-xl font-serif ">
//         <p>name</p>
//         <p>hi</p>
//       </div>
//     </div>

// <div className="w-full h-full flex flex-col items-start gap-5 ">
// <div className="max-w-2/5 bg-white flex flex-col overflow-hidden whitespace-normal rounded-xl p-4 font-serif">
//   <p>name</p>
//   <p>just checkin</p>
// </div>
// </div>
// </div>
  )
}

export default Message
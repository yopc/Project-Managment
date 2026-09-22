import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Authenticatioin } from '../Store/AuthenticateUser';
import Profile from '../../component/Profile';
import { useState } from 'react';
import { useRef } from 'react';
import { useMessage } from '../Store/useMessage';
import { Download, Paperclip, ArrowLeft, Send, File } from 'lucide-react';

const ChatPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {employee , getEmployee} = Authenticatioin();
    const [selectedFiles , setSelectedFile] = useState([])
    const [message, setMessage] = useState("");
    const {sendMessage,messages ,getMessage, setSelectedUser, subscribe} = useMessage();
    const [fileToSend , setFileToSend] = useState([])

     const messageEndRef = useRef(null);

   useEffect(() => {
    setSelectedUser(id)       // mark this conversation as active & clear its unread
    getEmployee(id)
    getMessage(id)

    subscribe()
    return () => {
      setSelectedUser(null)   // leaving chat => future msgs become unread again
    }
  }, [id])

    useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    }, [messages]);


    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)

        const previewUrl = files.map((file) => {
            if(file.type.startsWith('image/')) {
                return {file , preview:URL.createObjectURL(file)}
            }else {
                return {file , preview:null}
            }
        })

        setSelectedFile((prev) => [...prev , ...previewUrl])
        setFileToSend((prev) => [...prev,...files])
    }


  const removeFile = (index) => {
    const fileToRemove = selectedFiles[index];
    if (fileToRemove.preview) URL.revokeObjectURL(fileToRemove.preview);
    setSelectedFile((prev) => prev.filter((_, i) => i !== index));
  };


   const handleSend = async () => {
    if (!message && selectedFiles.length === 0) return;

    await sendMessage(message , fileToSend);

    setMessage("");
    selectedFiles.forEach(f => f.preview && URL.revokeObjectURL(f.preview));
    setSelectedFile([]);
    setFileToSend([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };


  return (
     <div className="flex flex-col h-full min-h-0 bg-gray-100 overflow-hidden">

       {/* Header */}
       <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-indigo-400 shadow-md px-3 sm:px-4 py-2.5 flex items-center justify-between z-10">
         {/* Left side: Back button, Profile & name */}
         <div className="flex items-center gap-2 sm:gap-3 min-w-0">
           <button
             onClick={() => navigate('/message')}
             className="md:hidden flex-shrink-0 text-white hover:text-blue-100 transition-colors p-1 -ml-1"
             aria-label="Back to conversations"
           >
             <ArrowLeft size={22} />
           </button>
           <Profile imageSrc={employee?.profilePicture} styleProp={'h-10 w-10 rounded-full border-2 border-white shadow-sm flex-shrink-0'} />
           <div className="min-w-0">
             <span className="block text-white font-semibold truncate">{employee?.fullName}</span>
           </div>
         </div>

         {/* Right side: actions */}
         <div className="flex items-center gap-4 text-white flex-shrink-0">
           <button className="hover:text-blue-200 transition-colors">
             <i className="fas fa-search"></i>
           </button>
           <button className="hover:text-blue-200 transition-colors">
             <i className="fas fa-ellipsis-v"></i>
           </button>
         </div>
       </div>

       {/* Chat messages */}
       <div className="flex-1 min-h-0 p-3 sm:p-4 overflow-y-auto space-y-4 scrollbar-hide">
          {
          messages.map((m, i) => {
             const isSender = m.senderId === id;

             return (
             <div key={i} className={`space-y-2 flex flex-col justify-end max-w-full ${ isSender? 'items-start': 'items-end'}`}>
              {(m.text)  && <span className={`px-4 py-2 rounded-2xl text-sm shadow-md max-w-[85%] sm:max-w-[75%] break-words ${
                  isSender
                    ? "bg-blue-500 text-white rounded-bl-none"
                    : "bg-white text-gray-800 border rounded-br-none"
                }`}>{m.text}</span>}
               {m.files.map((file, j) => {
                const keyIndex =  file.indexOf("data")
                const fileName = file.substring(0,keyIndex)
                const data = file.substring(keyIndex)

                if(data.startsWith('data:image/')){
                   return <img key={j} src={data} className='w-full max-w-sm h-auto object-contain max-sm:max-w-[75vw] rounded-lg border border-gray-200'/>
                }else{
                  return (
                    <div key={j} className={`flex flex-wrap gap-2 rounded-2xl p-2.5 items-center max-w-full ${
                      isSender ? "bg-blue-500 text-white rounded-br-none" : "bg-white border text-gray-800 rounded-bl-none"
                    }`}>
                      <div className='flex gap-1 min-w-0 items-center'>
                       <File className='flex-shrink-0'/>
                       <h1 className='break-all text-sm'>{fileName}</h1>
                      </div>

                      <a href={data} download={fileName} className={`flex-shrink-0 ${isSender ? 'text-white' : 'text-blue-500'}`}>
                        <Download/>
                      </a>
                    </div>
                  )
                }
               })}
             </div>
             )
          })
         }
         <div ref={messageEndRef} />
       </div>

       {/* Selected Files Preview */}
       {selectedFiles.length > 0 && (
         <div className="flex-shrink-0 p-2 border-t bg-white flex flex-wrap gap-2">
           {selectedFiles.map((fileObj, index) => (
             <div key={index} className="relative w-16 h-16 sm:w-20 sm:h-20 border rounded-lg overflow-hidden flex items-center justify-center">
               {fileObj.preview ? (
                 <img
                   src={fileObj.preview}
                   alt={fileObj.file.name}
                   className="object-cover w-full h-full"
                 />
               ) : (
                 <p className="text-xs text-gray-700 text-center p-1 break-words">
                   {fileObj.file.name}
                 </p>
               )}
               <button
                 onClick={() => removeFile(index)}
                 className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
               >
                 ✕
               </button>
             </div>
           ))}
         </div>
       )}

       {/* Input Section */}
       <div className="flex-shrink-0 flex items-center gap-2 bg-white px-2 sm:px-3 py-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
         <input
           type="file"
           name='file'
           id="fileInput"
           className="hidden"
           onChange={handleFileChange}
           multiple
         />
         <label
           htmlFor="fileInput"
           className="cursor-pointer flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
         >
           <Paperclip size={20}/>
         </label>

         <input
           type="text"
           name="text"
           value={message}
           onChange={(e) => setMessage(e.target.value)}
           onKeyDown={handleKeyDown}
           placeholder="Type a message..."
           className="flex-1 min-w-0 border rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
         />

         <button
           onClick={handleSend}
           disabled={!message && selectedFiles.length === 0}
           className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
           aria-label="Send message"
         >
           <Send size={18}/>
         </button>
       </div>
     </div>
  )
}

export default ChatPage
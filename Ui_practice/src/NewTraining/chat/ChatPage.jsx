import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Authenticatioin } from '../Store/AuthenticateUser';
import Profile from '../../component/Profile';
import { useState } from 'react';
import { useRef } from 'react';
import { useMessage } from '../Store/useMessage';
import { Download, Paperclip , File } from 'lucide-react';

const ChatPage = () => {
    const {id} = useParams();
    const {employee , getEmployee} = Authenticatioin();
    const [selectedFiles , setSelectedFile] = useState([])
    const [message, setMessage] = useState("");  
    const {sendMessage,messages ,getMessage, selectedUser , setSelectedUser, subscribe, unsubscribeFromMessages, clearUnread} = useMessage();
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
    if (messageEndRef.current && messages) {
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

    console.log("Message:", message);
    console.log("Files:", selectedFiles.map((f) => f.file));

    
    
    await sendMessage(message , fileToSend);
    // TODO: send message + files to backend

    // Clear inputs

    console.log('after sending the file')
    setMessage("");
    selectedFiles.forEach(f => f.preview && URL.revokeObjectURL(f.preview));
    setSelectedFile([]);
    setFileToSend([]); 
  };


  return (

     <div className="flex flex-col h-screen bg-gray-100 relative p-0">
       <div className="sticky top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-indigo-400 shadow-md p-3 flex items-center justify-between rounded-b-2xl z-10">
  {/* Left side: Profile & name */}
  <div className="flex items-center gap-3">
    <Profile imageSrc={employee?.profilePicture} styleProp={'h-10 w-10 rounded-full border-2 border-white shadow-sm'} />
    <div>
      <span className="block text-white font-semibold">{employee?.fullName}</span>
     
    </div>
  </div>

  {/* Right side: actions (example icons) */}
  <div className="flex items-center gap-4 text-white">
    <button className="hover:text-blue-200 transition-colors">
      <i className="fas fa-search"></i>
    </button>
    <button className="hover:text-blue-200 transition-colors">
      <i className="fas fa-ellipsis-v"></i>
    </button>
  </div>
</div>


      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto  space-y-4 scrollbar-hide">        
         {
         
          messages.map((m) => {
            
             const isSender = m.senderId === id;

             return (             
             
            <div className={`space-y-3  flex  flex-col justify-end ${ isSender? 'items-start': 'items-end'}`}
                 ref={messageEndRef}>
            {(m.length !==0 )  && <span    className={`px-4 py-2 rounded-2xl text-sm shadow-md ${
                isSender
                  ? "bg-blue-500 text-white rounded-bl-none"
                  : "bg-white text-gray-800 border  rounded-br-none"
              }`}>{m.text}</span>}            
               {m.files.map((file) => {
                const keyIndex =  file.indexOf("data")
                const fileName = file.substring(0,keyIndex)
                const data = file.substring(keyIndex)

                if(data.startsWith('data:image/')){
                   return <img src={data} className='size-96 border border-gray-200 rounded'/>
                }else{
                  return <div className='flex gap-10 bg-blue-500 text-white font-roboto rounded-lg p-2'>
                    <div className='flex gap-1'>
                     <File />
                     <h1 >{fileName}</h1>
                    </div>
                    
                     
                    <a href={data} download={fileName}>                         
                    <Download/></a>
                        
                        </div>
                }
                
                
               })}
            </div>

              )
                      
              })
         }
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="p-2 border-t bg-white flex flex-wrap gap-2">
          {selectedFiles.map((fileObj, index) => (
            <div key={index} className="relative w-20 h-20 border rounded-lg overflow-hidden flex items-center justify-center">
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
      <div className="flex items-center p-3 border-t bg-white gap-2 sticky left-0 bottom-0 right-0">
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
          className="cursor-pointer px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          <Paperclip/>
        </label>

        <input
          type="text"
          name="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2"
        />

        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
   
  )
}

export default ChatPage


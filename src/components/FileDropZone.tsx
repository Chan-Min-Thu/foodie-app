import { Box } from "@mui/material";
import { useDropzone } from "react-dropzone"

interface Props{
    onFileSelected:(acceptedFiles:File[]) => void;
}

const NewDropZone = ({onFileSelected}:Props)=>{
    const onDrop = (acceptedFiles:File[])=>{
        onFileSelected(acceptedFiles)
    }
    const {getRootProps,getInputProps,isDragActive} = useDropzone({onDrop})
    return (
        <Box
          {...getRootProps()}
          sx={{
            width:{xs:245,sm:345},
            borderRadius: 3,
            border: "3px dotted lightgray",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag drop some files here, or select files</p>
          )}
        </Box>
        
    )
}

export default NewDropZone;
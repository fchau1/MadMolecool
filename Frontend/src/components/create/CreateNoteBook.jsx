
"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CirclePlus, CircleX, NotebookPen } from "lucide-react";
import {withAuthInfo,useLogoutFunction, useRedirectFunctions} from "@propelauth/react";
import {createNotebook} from "@/lib/actions";
import toast from "react-hot-toast";
import { useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import {getRandomColor, WriteGEMINISummary} from "@/lib/utils";

function CreateNoteBook({user}) {

    const queryClient = useQueryClient()
    const [notebookName, setNotebookName] = useState('');
    const [notebookHypothesis, setnotebookHypothesis] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [uploadFile, setUploadFile] = useState(null);
    const [loading, setLoading] = useState(false); // Add loading state

    const handleNameChange = (event) => {
        setNotebookName(event.target.value);
    };

    const handleTextChange = (event) => {
        setnotebookHypothesis(event.target.value);
    };

    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleFileUpload = (event) => {
        setUploadFile(event.target.files[0]);
    };

    const [open, setOpen] = useState(false);
    const closeDialog = () => {
        setOpen(false);
    }
    const handleCreateNotebook = async () => {

        setLoading(true);
        const notebookData = {
            name: notebookName,
            hypothesis: notebookHypothesis,
            design: "",
            build: "",
            learn: "",
            test: "",
            bgColor: getRandomColor(),
            // image: imageFile,
            // file: uploadFile,
            user_id: user.userId // You need to define getUserId() function to get user ID
        };

        const summaryGemini = await WriteGEMINISummary(JSON.stringify(notebookData))

        try {
            const response = await createNotebook({...notebookData, summary: summaryGemini})
            toast.success("Notebook created successfully")
            queryClient.invalidateQueries(`notebooks-${user.userId}`);
            closeDialog();


        } catch (error) {
            console.error(error.message);
            toast.error("Failed to create notebook")
        } finally {
            setLoading(false);
            handleClearForm();
        }


    };

    const handleClearForm = () => {
        setNotebookName('');
        setnotebookHypothesis('');
        setImageFile(null);
        setUploadFile(null);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="flex items-center gap-2 rounded-lg bg-green-700 text-sm font-medium text-white transition hover:bg-green-800 focus:outline-none focus:ring"
                    type="button"
                >
                    <NotebookPen className={"h-5 w-5"} />
                    Add Notebook
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[1200px] "> {/* Add relative positioning */}
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                        <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}

                <DialogHeader>
                    <DialogTitle className={"text-3xl font-bold"}>Create Notebook</DialogTitle>
                    <DialogDescription>
                        Please fill in the details for your notebook.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid w-full items-center gap-3">
                    <Label className={"text-md"} htmlFor="name">Notebook Name</Label>
                    <Input
                        id="name"
                        type="input"
                        value={notebookName}
                        onChange={handleNameChange}
                        placeholder="Enter notebook name"
                    />
                </div>

                <div className="space-y-2">
                    <Label className={"text-md"} htmlFor="text">
                        Notebook Hypothesis
                    </Label>
                    <Textarea
                        className="min-h-[200px]"
                        id="text"
                        value={notebookHypothesis}
                        onChange={handleTextChange}
                        placeholder="Enter any text to save for your notebook"
                    />
                </div>

                <div className="flex justify-between gap-5 mt-2">
                    <div className="w-full space-y-1">
                        <Label className={"text-md"} htmlFor="image">Upload Image</Label>
                        <Input
                            accept="image/*"
                            id="image"
                            type="file"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="w-full space-y-1">
                        <Label className={"text-md"} htmlFor="file-upload">Upload File</Label>
                        <Input
                            id="file-upload"
                            type="file"
                            onChange={handleFileUpload}
                        />
                    </div>
                </div>

                <DialogFooter className={'flex flex-col gap-3'}>
                    <Button
                        disabled={!notebookName}
                        className="flex items-center gap-2 rounded-lg bg-green-700 text-sm font-medium text-white transition hover:bg-green-800 focus:outline-none focus:ring"
                        type="submit"
                        onClick={handleCreateNotebook}
                    >
                        <CirclePlus className={"w-5 h-5"} />
                        Create Notebook
                    </Button>
                    <Button
                        className={"flex gap-2 items-center"}
                        variant={"destructive"}
                        type="button"
                        onClick={handleClearForm}
                    >
                        <CircleX className={"w-5 h-5"} />
                        Clear
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


export default withAuthInfo(CreateNoteBook)

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {notFound, useRouter} from "next/navigation";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {BookA, CirclePlus, CircleX} from "lucide-react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import DeleteNoteBook from "@/components/notebook/DeleteNoteBook";
import NotebookMenu from "@/components/notebook/NotebookMenu";
import {WriteGEMINISummary} from "@/lib/utils";

const fetchNotebookID = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/notebooks/findOne?notebook_id=${id}`);
        const {data} = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching notebooks:', error);
    }
};

const updateNotebook = async ({notebook_id, notebookData}) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/notebooks/update/${notebook_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notebookData)
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Notebook updated successfully');
            return data;
        } else {
            console.error('Failed to update notebook');
            throw new Error(data.message || 'Failed to update notebook');
        }
    } catch (error) {
        console.error('Error updating notebook:', error);
        throw error;
    }
};

const DeleteNotebookID = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/notebooks/delete/${id}`,{
            method: 'DELETE'
        });
        const {data} = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching notebooks:', error);
    }
};

const NoteBookPage = ({params}) => {

    const router = useRouter()
    const [notebookData, setNotebookData] = useState({
        name: '',
        hypothesis: '',
        design: '',
        build: '',
        learn: '',
        test: ''
    });


    const notebook_id = params["notebookid"]
    const queryClient = useQueryClient()

    const {isLoading: loading, isError, data: notebooks} = useQuery({ queryKey: [`notebooks-edit-${notebook_id}`], queryFn: () => fetchNotebookID(notebook_id) })

    useEffect(() => {
        if (!loading && !isError && notebooks) {
            setNotebookData({
                name: notebooks.name || '',
                hypothesis: notebooks.hypothesis || '',
                design: notebooks.design || '',
                build: notebooks.build || '',
                learn: notebooks.learn || '',
                test: notebooks.test || ''
            });
        }
    }, [loading, isError, notebooks]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNotebookData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const NotesMutation = useMutation({
        mutationFn: updateNotebook,
        onSuccess: () => {
            toast.success('Notebook updated successfully');
            queryClient.invalidateQueries(`notebooks-edit-${notebook_id}`);
        },
        onError: (error) => {
            console.error('Error updating notebook:', error);
            toast.error(error.message || 'Failed to update notebook');
        }

    });

    const DeleteMutation = useMutation({
        mutationFn: DeleteNotebookID,
        onSuccess: () => {
            toast.success('Note deleted successfully');
            router.replace("/notebooks")
        },
        onError: (error) => {
            console.error('Error updating notebook:', error);
            toast.error(error.message || 'Failed to delete notebook');
        }

    });

    const handleNotebookUpdate = async () => {

        const notebookDataWithSummary = {
            ...notebookData,
            summary: await WriteGEMINISummary(JSON.stringify(notebookData))
        };

        await NotesMutation.mutate({ notebook_id, notebookData: notebookDataWithSummary } );
    };

    const handleDeleteNotebook = async () => {
        await DeleteMutation.mutate(notebook_id );
    };


    if (!notebooks && !loading) {
        notFound()
    };

    return (
        <div className="mx-auto max-w-screen-xl flex min-h-screen">

            <div className={"mt-3"}>
                <div className={"absolute left-0"}>
                    <NotebookMenu />
                </div>
            </div>

            <div className={"flex lg:px-0 px-4 w-full mt-5"}>
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel className={"overflow-y-auto min-w-[27rem]"}>
                        <div className="w-full px-6"> {/* Add relative positioning */}
                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                                    <div role="status">
                                        <svg aria-hidden="true" className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            )}

                            <div>
                                <h1 className={"text-2xl font-bold"}>Your Notebook</h1>
                                <p>
                                    Please edit in the details for your notebook.
                                </p>
                            </div>

                            <div className="grid w-full items-center mt-4 space-y-2">
                                <Label className={"text-md"} htmlFor="name">Notebook Name</Label>
                                <Input
                                    id="name"
                                    type="input"
                                    value={notebookData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter notebook name"
                                />
                            </div>

                            <div className="space-y-3 mt-4">
                                <Label className={"text-md"} htmlFor="text">
                                    Hypothesis
                                </Label>
                                <Textarea
                                    className="min-h-[100px]"
                                    id="hypothesis"
                                    value={notebookData.hypothesis}
                                    onChange={handleInputChange}
                                    placeholder="Enter hypothesis"
                                />
                            </div>

                            <div className="space-y-3 mt-4">
                                <Label className={"text-md"} htmlFor="text">
                                    Design
                                </Label>
                                <Textarea
                                    className="min-h-[100px]"
                                    id="design"
                                    value={notebookData.design}
                                    onChange={handleInputChange}
                                    placeholder="Enter design"
                                />
                            </div>

                            <div className="space-y-3 mt-4">
                                <Label className={"text-md"} htmlFor="text">
                                    Build
                                </Label>
                                <Textarea
                                    className="min-h-[100px]"
                                    id="build"
                                    value={notebookData.build}
                                    onChange={handleInputChange}
                                    placeholder="Enter build"
                                />
                            </div>

                            <div className="space-y-3 mt-4">
                                <Label className={"text-md"} htmlFor="text">
                                    Learn
                                </Label>
                                <Textarea
                                    className="min-h-[100px]"
                                    id="learn"
                                    value={notebookData.learn}
                                    onChange={handleInputChange}
                                    placeholder="Enter learn"
                                />
                            </div>

                            <div className="space-y-3 mt-4">
                                <Label className={"text-md"} htmlFor="text">
                                    Test
                                </Label>
                                <Textarea
                                    className="min-h-[100px]"
                                    id="test"
                                    value={notebookData.test}
                                    onChange={handleInputChange}
                                    placeholder="Enter test"
                                />
                            </div>

                            <div className="flex justify-between gap-5 mt-2">
                                <div className="w-full space-y-2">
                                    <Label className={"text-md"} htmlFor="image">Upload Image</Label>
                                    <Input
                                        accept="image/*"
                                        id="image"
                                        type="file"
                                    />
                                </div>
                                <div className="w-full space-y-1">
                                    <Label className={"text-md"} htmlFor="file-upload">Upload File</Label>
                                    <Input
                                        id="file-upload"
                                        type="file"
                                    />
                                </div>
                            </div>

                            <div className={'flex justify-end mt-5 gap-3'}>
                                <Button
                                    onClick={handleNotebookUpdate}
                                    disabled={!notebookData.name.trim()}
                                    className="flex items-center gap-2 rounded-lg bg-green-700 text-sm font-medium text-white transition hover:bg-green-800 focus:outline-none focus:ring"
                                    type="submit"
                                >
                                    <CirclePlus className={"w-5 h-5"} />
                                    Update Notebook
                                </Button>

                            </div>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel className={"min-w-[27rem]"}>
                        <div className="flex flex-col w-full ">
                            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b  px-6 dark:bg-gray-800/40">
                                <Link className="lg:hidden" href="#">
                                    <MessageSquareIcon className="h-6 w-6" />
                                    <span className="sr-only">Home</span>
                                </Link>
                                <div className="flex-1">
                                    <h1 className="font-semibold text-base lg:text-xl">Chat with {notebooks?.name} notes.</h1>
                                </div>

                                <DeleteNoteBook deleteAction={handleDeleteNotebook} />
                            </header>

                            <main className="flex flex-2 flex-col gap-4 p-4 md:gap-8 md:p-6">
                                <div className="grid gap-4">
                                    <div className="flex items-start">
                                        <img
                                            alt="Avatar"
                                            className="rounded-full"
                                            height="40"
                                            src="https://cdn-icons-png.flaticon.com/512/10001/10001549.png"
                                            style={{
                                                aspectRatio: "40/40",
                                                objectFit: "cover",
                                            }}
                                            width="40"
                                        />
                                        <div className="grid gap-2 ml-2">
                                            <div className="bg-gray-100/40 p-4 rounded-xl text-sm break-words dark:bg-gray-800/40">
                                                Hi there! How can I help you today?
                                            </div>
                                            <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                <time className="font-medium" dateTime="2023-03-23T16:55:00Z">
                                                    Today, 4:55 PM
                                                </time>
                                                <span className="text-gray-500 dark:text-gray-400">Read</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-end">
                                        <div className="grid gap-2 mr-2">
                                            <div className="bg-gray-100/40 p-4 rounded-xl text-sm break-words dark:bg-gray-800/40">
                                                Hello! I have a question about my recent order.
                                            </div>
                                            <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                <time className="font-medium" dateTime="2023-03-23T16:55:00Z">
                                                    Today, 4:55 PM
                                                </time>
                                                <span className="text-gray-500 dark:text-gray-400">Read</span>
                                            </div>
                                        </div>
                                        <img
                                            alt="Avatar"
                                            className="rounded-full"
                                            height="40"
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-iTUb8BWzgui2dB1hvy0C77ugee40UWq-PTm7oT0jSA&s"
                                            style={{
                                                aspectRatio: "40/40",
                                                objectFit: "cover",
                                            }}
                                            width="40"
                                        />
                                    </div>
                                </div>
                                <div className="mt-auto flex gap-4">
                                    <Input className="flex-1 min-h-[50px]" placeholder="Type a message..." type="text" />
                                    <Button>Send</Button>
                                </div>
                            </main>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>

            </div>

        </div>
    )

};

export default NoteBookPage;

function MessageSquareIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    )
}



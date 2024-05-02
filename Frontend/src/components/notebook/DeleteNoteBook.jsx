

import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog";
import {BookA} from "lucide-react";

export default function DeleteNoteBook({deleteAction}) {
    return (
        <div className="flex justify-center my-8">
            <Dialog>
                <DialogTrigger asChild>
                    <Button size={"sm"} className={"w-fit flex gap-2 text-sm font-semibold"} variant={'destructive'}>
                        <BookA className={"h-5 w-5"}/>
                        Delete Notebook
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete this notebook?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your notebook.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="secondary">Cancel</Button>
                        <Button variant="destructive" onClick={deleteAction}>Continue</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

"use server"


export const createNotebook = async (noteData) => {

    try{

        const res = await fetch(`http://127.0.0.1:5000/notebooks/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...noteData,
            })
        });


    } catch (error){
        console.error('Error creating post:', error.message);

    }
}




import "./NoteBook.css"
export default function NoteBook({notebookItem}) {

    return (
        <div className="frame">
            <div className="book-cover-container">
                <div className="binding"></div>
                <div className="binding-shadow"></div>
                <div className="cover">
                    <div className="heading-cont">
                        <div className="heading">{notebookItem.text}</div>
                    </div>
                    <div className="ribbon">
                    </div>
                </div>
            </div>
        </div>
    )
}
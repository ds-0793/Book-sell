import Book from "./Book"

function BookList(props) {
    return(
        <div className="book-list">
            {props.books.map((book, index) => (
                <Book 
                key={book.id}
                book={book}
                onUpdate={props.onUpdate}
                onDelete={props.onDelete}
                />
            ))}
        </div>
    );
}

export default BookList;
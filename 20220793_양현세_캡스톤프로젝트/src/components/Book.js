function Book(props) {
    function setSelling() {
        props.onUpdate(props.book.id, "판매중");
    }

    function setSold() {
        props.onUpdate(props.book.id, "판매완료")
    }

    function onDelete() {
        props.onDelete(props.book.id);
    }

    return(
        <div className="book-card">
            <h3>{props.book.title}</h3>
            <p>저자: {props.book.author}</p>
            <p>가격: {props.book.price}원</p>
            <p>상태: {props.book.status}</p>
            <p>분류: {props.book.category}</p>
            <p>등록일: {props.book.createdAt || "-"}</p>

                <p>판매완료일 : {props.book.soldAt || "-"}</p>

            <button onClick={setSelling}>판매중 전환</button>
            <button onClick={setSold}>판매완료 전환</button>
            <button onClick={onDelete}>삭제</button>
        </div>
    );
}

export default Book;
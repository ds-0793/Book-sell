import { useState } from "react";

function BookForm(props) {
    const [title, setTitle] = useState("");
    const [author,setAuthor] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("전공");

    function onSubmit(e) {
        e.preventDefault();

        if (title === "" || author === "" || price === "") {
            return
        }

        props.onCreate({
            title: title,
            author: author,
            price: price,
            status: "판매중",
            category,
        });

        setTitle("");
        setAuthor("");
        setPrice("");
        setCategory("전공");
    }

    return(
        <form onSubmit={onSubmit}>
            <h2>중고책 등록</h2>
            
            <input
                placeholder="책 제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}/>

            <input
                placeholder="저자"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}/>
            
            <input
                placeholder="가격"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}/>
            
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                    <option value="전공">전공책</option>
                    <option value="비전공">비전공책</option>
                </select>

                <button type="submit">등록</button>
        </form>

    )
}

export default BookForm;
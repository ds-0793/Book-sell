import { useState} from 'react';
import Header from './components/Header'
import BookList from './components/BookList';
import BookForm from "./components/BookForm"

function getToday() {
  const date = new Date();
  return date.toLocaleDateString();
}

function App() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "한 입 크기로 잘라먹는 리액트",
      author: "이정환",
      price: 15000,
      status: "판매중",
      category: "전공",
    },
    {
      id: 2,
      title: "기초영어",
      author: "오로라",
      price: 12000,
      status: "판매완료",
      category: "비전공",
    },
  ]);

  const [filter, setFilter] = useState("전체")
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("기본")
  const totalCount = books.length;

  const sellingCount = books.filter(
    (book) => book.status === "판매중"
  ).length;

  const soldCount = books.filter(
    (book) => book.status === "판매완료"
  ).length;

  const majorCount = books.filter(
    (book) => book.category === "전공"
  ).length;

  const nonMajorCount = books.filter(
    (book) => book.category === "비전공"
  ).length

  const filterBooks = books.filter((book) => {
    const statusMatch =
      filter === "전체" || book.status === filter;
    
    const searchMatch =
      book.title.includes(search);

    return statusMatch && searchMatch;
  })

  .sort((a,b) => {
    if (sort === "오름차순") {
      return a.price - b.price;
    }
    if (sort === "내림차순") {
      return b.price - a.price;
    }
    return 0;
  })

  function onCreate(book) {
    setBooks([
      {
        id: Date.now(),
        ...book,
        createdAt : getToday(),
        soldAt: null,
      },
        ...books]);
  }

  function onUpdate(id, status) {
    const newBooks = books.map((book) => book.id === id
      ? {
          ...book,
          status: status,
          soldAt: status === "판매완료" ? getToday() : null,
      }
    : book
    );
    setBooks(newBooks);
  }

  function onDelete(id) {
    setBooks(books.filter((book) => book.id !== id));
  }

  return (
    <div>
      <Header />

      <div>
        <p>
          총 {totalCount}권 | 판매중 {sellingCount}권 | 판매완료 {soldCount}권
        </p>
        <p>
          전공책 {majorCount}권 | 비전공책  {nonMajorCount} 권
        </p>
      </div>

      <BookForm onCreate={onCreate}/>
      <h2>중고책 목록</h2>
      <div>
        <input placeholder="책 제목 검색" value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>
      <pre></pre>
      <div>
      <button onClick={() => setFilter("전체")}>전체</button>
      <button onClick={() => setFilter("판매중")}>판매중</button>
      <button onClick={() => setFilter("판매완료")}>판매완료</button>
      </div>
      <pre></pre>

      <div>
        <button onClick={() => setSort("오름차순")}>가격 오름차순</button>
        <button onClick={() => setSort("내림차순")}>가격 내림차순</button>
      <pre></pre>
      </div>
      <BookList books={filterBooks} 
      onUpdate={onUpdate} onDelete={onDelete}/>

    </div>
  );
}

export default App;
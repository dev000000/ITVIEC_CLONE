# React + TypeScript Best Practices

---

## 1. Định nghĩa Props rõ ràng với `interface` hoặc `type`

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled = false }: ButtonProps) => (
  <button onClick={onClick} disabled={disabled}>{label}</button>
);
```

---

## 2. Cấu trúc file chuẩn

Mỗi component gồm 2 file chính:

```
components/
  Button/
    Button.tsx        ← logic + JSX
    Button.scss       ← styles
```

> Không cần tách `Button.types.ts` riêng — định nghĩa `interface` Props ngay trong `Button.tsx` là đủ và gọn hơn với component nhỏ/trung bình.

---

## 3. Viết handler ra ngoài JSX — không dùng inline arrow function

Tránh viết logic trực tiếp vào JSX. Handler phải được khai báo thành hàm riêng bên trong component (hoặc bên ngoài nếu không cần closure).

```tsx
// ❌ Sai — inline arrow function trong JSX
const Button = ({ id }: ButtonProps) => (
  <button onClick={() => console.log(id)}>Click</button>
);

// ✅ Đúng — tách handler ra
const Button = ({ id, onDelete }: ButtonProps) => {
  const handleClick = () => {
    console.log(id);
    onDelete(id);
  };

  return <button onClick={handleClick}>Click</button>;
};
```

> Rule: bất cứ `onClick`, `onChange`, `onSubmit`,... nào có logic thì phải là named handler.

---

## 4. Typing `useState`, `useRef`, `useCallback`

```tsx
const [count, setCount] = useState<number>(0);
const inputRef = useRef<HTMLInputElement>(null);
```

---

## 5. Dùng `useMemo` và `useCallback` đúng chỗ

Chỉ dùng khi object/array/function được tạo bên trong component và có nguy cơ re-create mỗi render gây ra re-render thừa ở component con.

```tsx
// ❌ Không cần — giá trị primitive không cần memo
const doubled = useMemo(() => count * 2, [count]);

// ✅ Nên dùng — object/array truyền xuống component con
const filters = useMemo(
  () => ({ status: "active", page }),
  [page]
);

// ✅ Nên dùng — callback truyền xuống component con có React.memo
const handleSubmit = useCallback((value: string) => {
  onSave(value);
}, [onSave]);
```

> Không cần `useMemo`/`useCallback` cho mọi thứ — chỉ dùng khi thực sự có vấn đề về performance hoặc referential equality.

---

## 6. Dùng `children` đúng cách

```tsx
interface LayoutProps {
  children: React.ReactNode; // ✅ Chuẩn nhất
}
```

---


---

## 8. Tránh các lỗi phổ biến

| ❌ Sai | ✅ Đúng |
|--------|---------|
| `any` tràn lan | Dùng `unknown` hoặc type cụ thể |
| Inline logic trong JSX | Tách thành named handler |
| Mutate state trực tiếp | Luôn return state mới |
| `key={index}` trong list | Dùng unique ID |
| `useMemo`/`useCallback` mọi nơi | Chỉ dùng khi cần thiết |

---

## 9. Naming Convention

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| Component | PascalCase | `UserCard` |
| Handler | camelCase + `handle` | `handleClick`, `handleSubmit` |
| Type/Interface | PascalCase | `UserCardProps` |
| Constant | UPPER_SNAKE | `MAX_RETRIES` |
| SCSS class | kebab-case | `.button--primary` |

---

## 10. Checklist trước khi commit

- [ ] Props có `interface` rõ ràng
- [ ] Không dùng `any`
- [ ] Không có inline arrow function trong JSX (với logic)
- [ ] `key` prop dùng unique ID
- [ ] `children: React.ReactNode` thay vì `React.FC`
- [ ] `useMemo`/`useCallback` chỉ dùng khi cần
- [ ] File component đi kèm `.scss`
- [ ] Export qua `index.ts`

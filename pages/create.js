import { useRouter } from 'next/router'
import ProductForm from '../components/ProductForm'

export default function CreateProduct() {
  const router = useRouter()
  // const { user } = useAuth()

  // // Kiểm tra xem người dùng có đăng nhập không
  // useEffect(() => {
  //   if (!user) {
  //     router.push('/auth')  // Nếu chưa đăng nhập, chuyển hướng về trang login
  //   }
  // }, [user, router])  // Đảm bảo cập nhật khi user thay đổi

  // if (!user) {
  //   return <div>Loading...</div>  // Hiển thị loading nếu chưa có user
  // }

  // Hàm tạo sản phẩm mới
  const handleCreate = async (formData) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!res.ok) throw new Error('Failed to create')  // Kiểm tra xem tạo có thành công không

    const data = await res.json()
    router.push(`/product/${data.id}`)  // Chuyển đến trang chi tiết sản phẩm mới tạo
  }

  return <ProductForm onSubmit={handleCreate} />  // Trả về form để tạo sản phẩm
}

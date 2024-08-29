# Memory Leak ทดสอบความผิดพลาดจากการจัดการข้อมูลผิดพลาด

[Memory Leak](https://en.wikipedia.org/wiki/Memory_leak) คือความผิดพลาดการเขียนโค้ดที่ทำให้เกิดช่องโหว่ สร้างข้อมูลบางอย่างซ้ำๆจนเกิดอาการใช้ทรัพยากรในคอมพิวเตอร์มากเกินความจำเป็น โดยจากตัวอย่างเป็นการยกตัวอย่างเรื่อง [Event handling](https://en.wikipedia.org/wiki/Event_(computing)) ในการอัปเดต [หน้าจอโปรแกรม (UI)](https://en.wikipedia.org/wiki/User_interface)

โดยจากปัญหาของโค้ดตัวอย่าง จะเกิดการรัน `Updating UI...` แบบซ้ำๆมากเกินไปหากมีการสร้าง [Instance](https://en.wikipedia.org/wiki/Class_(computer_programming)) หลายครั้ง ซึ่งตามหลักการแล้วควรเกิดขึ้นครั้งเดียว ซึ่งปัญหานี้ ChatGPT-4o-mini ก็สามารถเข้าใจได้แม้ว่าเราจะไม่ได้บอกใบ้เลยว่าปัญหาโค้ดคืออะไร แค่บอกให้ช่วยตรวจสอบอะไรก็ได้เท่านั้น และมีการแนะนำให้ใช้วิธีแก้ไขด้วย [Singleton](https://en.wikipedia.org/wiki/Singleton_pattern) ซึ่งเป็นแนวทางแก้ไขปัญหาที่ถูกต้อง

**ลิงก์สำหรับแชทของ AI:** [https://chatgpt.com/share/bdf92d44-61cc-4115-9c4d-748b61815267](https://chatgpt.com/share/bdf92d44-61cc-4115-9c4d-748b61815267)

## วิธีการรันไฟล์

กรณีนี้เราต้องการรันไฟล์ TypeScript ทำได้หลายวิธี แต่ผมจะเลือกใช้วิธีนี้เพราะง่ายและสะดวกสำหรับผม

- ติดตั้ง [Node.js](https://nodejs.org/en)
- ใช้คำสั่ง `npm install tsx -g`
- จากนั้น `tsx *.ts` ตามไฟล์ที่เราต้องการ โดยจะมี `incorrect.ts` คือไฟล์ที่ผิดพลาด ส่วนของ `correct.ts` คือไฟล์ที่ได้รับการแก้ไขผ่าน AI แล้ว

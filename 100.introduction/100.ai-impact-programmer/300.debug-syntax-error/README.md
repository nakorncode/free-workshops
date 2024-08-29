# Syntax Error ทดสอบความผิดพลาดจากการเขียนผิด

กรณีนี้ผมได้สั่งให้ [Claude AI](https://claude.ai/) สร้างโค้ดที่มีจุด [Syntax Error](https://en.wikipedia.org/wiki/Syntax_error) หลากหลายมากดังตัวอย่างโค้ด จากนั้นใช้ ChatGPT-4o-mini ตามเดิมเพื่อทดสอบดูว่าจะสามารถแก้ไขโค้ดได้อย่างถูกต้องหรือไม่

โดยหลังจากได้ทดสอบการแก้ไขโค้ดที่มีจุดผิดพลาดต่างๆแล้ว ก็สามารถทำงานได้ถูกต้อง อีกทั้งเมื่อแก้ไขเสร็จแล้วก็พบว่าขาดการสร้างไฟล์ `./types.ts` ไว้ด้วย จึงสั่งให้สร้างไฟล์นี้เพิ่มเติมพร้อมกำหนด Interface ให้ถูกต้อง ก็พบว่าสามารถทำงานได้เช่นกัน

**ลิงก์ของโค้ดที่มีความผิดพลาด และถูกแก้ไขแล้ว:** [https://github.com/nakorncode/free-workshops/tree/main/100.introduction/500.ai-impact-programmer/100.create-function](https://github.com/nakorncode/free-workshops/tree/main/100.introduction/500.ai-impact-programmer/100.create-function)

**ลิงก์สำหรับแชทของ AI:** [https://chatgpt.com/share/7c9cd959-d89a-4951-8570-4cc5f15ba3a6](https://chatgpt.com/share/7c9cd959-d89a-4951-8570-4cc5f15ba3a6)

## วิธีการรันไฟล์

กรณีนี้เราต้องการรันไฟล์ TypeScript ทำได้หลายวิธี แต่ผมจะเลือกใช้วิธีนี้เพราะง่ายและสะดวกสำหรับผม

- ติดตั้ง [Node.js](https://nodejs.org/en)
- ใช้คำสั่ง `npm install tsx -g`
- จากนั้น `tsx *.ts` ตามไฟล์ที่เราต้องการ โดยจะมี `incorrect.ts` คือไฟล์ที่ผิดพลาด ส่วนของ `correct.ts` คือไฟล์ที่ได้รับการแก้ไขผ่าน AI แล้ว

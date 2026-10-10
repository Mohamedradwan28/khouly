1) ارفع المجلد على GitHub ثم Import في Vercel (أو شغّل: npm i -g vercel ثم vercel داخل المجلد).
2) Vercel > Storage > Create > Blob، واربطه بالمشروع (بيضيف BLOB_READ_WRITE_TOKEN تلقائيًا).
3) Settings > Environment Variables: أضف ADMIN_PASSWORD بكلمة سر قوية.
4) اعمل Redeploy. الموقع على / ولوحة التحكم على /admin

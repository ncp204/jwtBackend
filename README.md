# jwtBackend

<!-- Sequelize -->
<!-- Cài đặt: -->
npm install --save-dev sequelize-cli
<!-- Khởi tạo tự động-->
npx sequelize-cli init
<!-- Tạo một model -->
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
<!-- Khởi chạy để tạo bảng trong db -->
npx sequelize-cli db:migrate
<!-- Trở lại migration trước đó hoặc ... -->
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
<!-- Khởi tạo seed để thêm dữ liệu mẫu, khởi chạy seed, undo seed -->
npx sequelize-cli seed:generate --name demo-user
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo
npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
npx sequelize-cli db:seed:undo:all

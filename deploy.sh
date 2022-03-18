git add -A

# 修改具体题目编号
git commit -m ":hammer: init"

git config --global http.sslVerify "false"
git config --global --unset http.proxy

git push

cd -
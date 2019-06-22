echo "Checking commit message...";
if grep -e "^GH-\d\+\s" $1;
then
  echo "Looks good!"
  exit 0;
else
  echo "Commit message is missing an issue! Message should start with GH-[issueNumber],";
  echo "but instead received: \"`cat $1`\".";
  exit 1;
fi
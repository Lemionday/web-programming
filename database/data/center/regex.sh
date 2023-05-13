// extrat data from raw.txt to center.csv
cat raw.txt | rg -U '^\w.+$\n\n^.*' | rg '^[^$]' | rg '\s*$' -r '' | rg -U '\n^\s+.*: ' -r '; ' > center.csv

// get id of center
cat center.csv | rg '^.*\d{4}[A-Z].*$' -o > id.csv

// merge 2 files
paste center.csv id.csv -d ';' > centers.csv

jq -Rsn '
    [inputs
     | . / "\n"
     | (.[] | select(length > 0) | . / ";") as $input
     | {"id": $input[0], "name": $input[1], "address": $input[2]
' < centers.csv
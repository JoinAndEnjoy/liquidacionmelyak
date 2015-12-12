path='./csv-files/CorreoEjemplo.html'
string=""

with open(path) as fp:
    for line in fp:
        if len(line)>1:
            string+=line

print(string)
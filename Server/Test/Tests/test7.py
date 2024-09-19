list=[1, 3, 4, 0, -1, -12, -23, 289]
list_len=len(list)
print("The element stored in <myList> are:")
string=''
for i in list :
    string+=(str(i)+' ')
print(string)
print(f"The length of mylist is < {list_len} >")
list.remove(list[0])
list.append(list_len)
print("The update list is:",list)


print("Input the element to be stored in <mylist> sequentially...")

user_input=''
num=1
my_list=[]
while user_input.lower() != 'q':
    user_input=input(f"Enter the {num}-th element; enter 'Q'/'q' when completed:")
    if user_input.lower() != 'q':
        my_list.append(user_input)
    num+=1
else:
    print('The elements stored in mydlist are:')
    string=''
    sum=0
    odd=0
    for i in my_list :
        sum+=float(i)
        if float(i)%2==0:
            odd+=1
        string+=(str(i)+' ')
    print(string)
    print(f"The total sum of these elements is {sum} and the number of odd numbers is {odd}.")


user_enter=input('Enter a string:')
print('First five characters are',user_enter[0:5])
ans=''
for i in range(len(user_enter)-1,-1,-1):
    ans+=user_enter[i]
print(ans)


code_input=input('Please enter the course code:')
title_input=input('Please enter the course title:')
number_input=input('Please enter the course number:')

inlist=[code_input,title_input,number_input]

inString=''
inString+=code_input+', '
inString+=title_input+', '
inString+=number_input
print(f"Record displayed in string :< {inString} >")
print(f"Record displayed in a list of strings: {inlist}")
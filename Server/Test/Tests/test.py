#Question 1A
aStr=str(input("Enter a string:"))
fStr=aStr[0:int(len(aStr)/4)]
eStr=aStr[int(((len(aStr)/4))*3):]
print("Joined string is",fStr+eStr)

#Question 2
import random
def generate_mark_six():
    ans=[]
    n=0
    while n<5:
        ans.append(random.randint(1,49))
        n+=1
    return ans
print("The resilt of today's Mark Six is",generate_mark_six())
    
#Question 3a

def get_student_list():
    arr=[]
    user_input=input('Please entry a new student name, ("quit" if no more student):')
    while user_input !='quit':
        if not user_input:
            print('Empty student name is not allowed.')
        else:
            arr.append(user_input)
        user_input=input('Please entry a new student name, ("quit" if no more student):')
    else:
        print("The whole class list is",arr)
    return(arr)
get_student_list()
#Question 3b
def form_3_groups(arr):
    class_group_list=[[],[],[]]

    state='1'
    for i in arr:
        if state=='1':
            class_group_list[0].append(i)
            state='2'
        elif state=='2':
            class_group_list[1].append(i)
            state='3'
        else:
            class_group_list[2].append(i)
            state='1'
    return(class_group_list)

print(form_3_groups(get_student_list()))

#Question 3c

def form_groups_of_3(arr):
    class_group_list=[[]]

    state=0
    for i in arr:
        class_group_list[state].append(i)
        if len(class_group_list[state])==3:
            class_group_list.append([])
            state+=1
    return(class_group_list)
print(form_groups_of_3(get_student_list()))

#Question 4a
def is_prime_number(num):
    if num > 1:
        # check for factors
        for i in range(2, num):
            if (num % i) == 0:
                return(True)
        return(False)


user_input=int(input('Please input an integer:'))
if(is_prime_number(user_input)):
    print(user_input,'is not a prime number')
else:
    print(user_input,'is a prime number')

#Question 4a
#import is_prime_number


user_input=int(input('Please input an integer:'))
if(is_prime_number(user_input)):
    arr=[]
    for i in range(2, user_input):
        if (user_input % i) == 0:
            arr.append(i)
    print("The prime numbers are",arr)





#rdddt

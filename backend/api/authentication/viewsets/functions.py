from django.shortcuts import render,redirect
from django.contrib.auth.models import User,auth
from .models import Mentor, Mentee
from django.contrib import messages




def register(request):
    if request.method == 'POST':
        # Retrieve form data
        name = request.POST['name']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        email = request.POST['email']
        phone = request.POST['phone']

        
        language = request.POST.getlist('language')
        language = ','.join(language)

        education = request.POST['education']

        modules = request.POST.getlist('modules')
        modules = ','.join(modules)

        days = request.POST.getlist('days')
        days = ','.join(days)
        time = request.POST.getlist('time')
        time = ','.join(time)
        assigned = request.POST['assigned']

        # Check if passwords match
        if password1 == password2:
            # Create Mentor instance
            mentor = Mentor(
                name=name,
                password1=password1,
                password2=password2,
                email=email,
                phone=phone,
                language=language,
                education=education,
                modules=modules,
                days=days,
                time=time,
                assigned=assigned
            )
            mentor.save()  # Save the mentor entry to the database

            return redirect('login')  # Redirect to a success page
        else:
            messages.info(request, 'Password incorrect')

        return redirect('/')
    else:
        return render(request, 'register.html')





def register1(request):
    if request.method == 'POST':
        # Retrieve form data
        name = request.POST['name']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        email = request.POST['email']
        phone = request.POST['phone']

        
        language = request.POST.getlist('language')
        language = ','.join(language)

        education = request.POST['education']

        modules = request.POST.getlist('modules')
        modules = ','.join(modules)

        days = request.POST.getlist('days')
        days = ','.join(days)
        time = request.POST.getlist('time')
        time = ','.join(time)
        assigned = request.POST['assigned']

        # Check if passwords match
        if password1 == password2:
            # Create Mentor instance
            mentee = Mentee(
                name=name,
                password1=password1,
                password2=password2,
                email=email,
                phone=phone,
                language=language,
                education=education,
                modules=modules,
                days=days,
                time=time,
                assigned=assigned
            )
            mentee.save()  # Save the mentor entry to the database

            return redirect('login')  # Redirect to a success page
        else:
            messages.info(request, 'Password incorrect')

        return redirect('/')
    else:
        return render(request, 'register1.html')
    


def calculate_language_score(mentor, mentee):
    mentor_languages = mentor.language.split(',')
    mentee_languages = mentee.language.split(',')

    common_languages = set(mentor_languages) & set(mentee_languages)
    language_score = len(common_languages)

    return language_score


def calculate_day_time_score(mentor, mentee):
    mentor_days = mentor.days.split(',')
    mentor_timeslots = mentor.time.split(',')

    mentee_days = mentee.days.split(',')
    mentee_timeslots = mentee.time.split(',')

    common_days = set(mentor_days) & set(mentee_days)
    common_timeslots = set(mentor_timeslots) & set(mentee_timeslots)

    day_time_score = len(common_days) * len(common_timeslots)

    return day_time_score


def calculate_module_score(mentor, mentee):
    mentor_modules = mentor.modules.split(',')
    mentee_module = mentee.modules

    module_score = 0

    if mentee_module in mentor_modules:
        module_score = 1

    return module_score


def calculate_score(mentor, mentee):
    language_score = calculate_language_score(mentor, mentee)
    day_time_score = calculate_day_time_score(mentor, mentee)
    module_score = calculate_module_score(mentor, mentee)

    # Define the weights for each criterion
    language_weight = 7  # Higher weight for language
    day_time_weight = 3
    module_weight = 1  # Lower weight for module

    # Calculate the overall score
    overall_score = (language_score * language_weight) + (day_time_score * day_time_weight) + (module_score * module_weight)

    return overall_score


def mapping(request):
    if request.method=='POST':
        

            mentors = Mentor.objects.filter(assigned=0)
            mentees = Mentee.objects.filter(assigned=0)
            for mentee in mentees:
                scores_mentee = []
                best_match = None
                best_score = 0
                
                for mentor in mentors:
                    # Calculate the score for each unassigned mentor based on the criteria
                    score = calculate_score(mentor, mentee)
                    scores_mentee.append(score)
                        
                    # Check if the current mentor has a higher score than the current best match
                    if score > best_score:
                        best_match = mentor
                        best_score = score

                # Check if a best match mentor was found
                if best_match:
                    best_match.assigned = 1  # Set the assigned flag to 1
                    best_match.save()  # Save the mentor instance
                    mentee.mentor = best_match  # Assign the best matching mentor to the mentee
                    mentee.assigned=1
                else:
                    # No best match mentor found, assign the mentor with the next best score
                    best_match = max(mentors, key=lambda mentor: calculate_score(mentor, mentee))
                    if best_match:
                        best_match.assigned = 1  # Set the assigned flag to 1
                        best_match.save()  # Save the mentor instance
                        mentee.mentor = best_match  # Assign the next best matching mentor to the mentee
                        mentee.assigned=1

                mentee.save()
                
            
            return redirect('mapping')
    else:

        return render(request, 'mapping.html')













def login(request):
    if request.method=='POST':
        username=request.POST['username']
        password=request.POST['password']
        user= auth.authenticate(username=username, password=password)
        if user is not None:
            auth.login(request,user)
            return redirect('/')
        else:
            messages.info(request,'Invalid credentials')
            return redirect('login')

    else:
        return render(request,'login.html')
    

def logout(request):
    auth.logout(request)
    return redirect('/')
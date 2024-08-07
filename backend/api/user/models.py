from django.db import models

from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **kwargs):
        """Create and return a `User` with an email, username and password."""
        if username is None:
            raise TypeError("Users must have a username.")
        if email is None:
            raise TypeError("Users must have an email.")

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError("Superusers must have a password.")
        if email is None:
            raise TypeError("Superusers must have an email.")
        if username is None:
            raise TypeError("Superusers must have an username.")

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    def __str__(self):
        return f"{self.username}"

class Mentor(models.Model):
    name= models.CharField(max_length=100)
    email=models.CharField(max_length=100) #Upload to folder name pics
    phone= models.CharField(max_length=100)
    language= models.CharField(max_length=100)
    education= models.CharField(max_length=100)
    modules= models.CharField(max_length=100)
    days= models.CharField(max_length=100)
    time= models.CharField(max_length=100)
    password1= models.CharField(max_length=100)
    password2= models.CharField(max_length=100)
    assigned= models.CharField(max_length=100)


class Mentee(models.Model):
    name= models.CharField(max_length=100)
    email=models.CharField(max_length=100) #Upload to folder name pics
    phone= models.CharField(max_length=100)
    language= models.CharField(max_length=100)
    education= models.CharField(max_length=100)
    modules= models.CharField(max_length=100)
    days= models.CharField(max_length=100)
    time= models.CharField(max_length=100)
    password1= models.CharField(max_length=100)
    password2= models.CharField(max_length=100)
    assigned= models.CharField(max_length=100)
    mentor=models.ForeignKey(Mentor, on_delete=models.SET_NULL, null=True)
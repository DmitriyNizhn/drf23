from django.contrib import admin
# from users import models as model_users


from .models import User

admin.site.register(User)
# @admin.register(model_users.User)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ["id", "is_active", 'date_joined', 'is_staff']
#     list_editable = ["is_active"]
#     ordering = ['date_joined']
#     list_filter = ["is_active", "is_staff"]

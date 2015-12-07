# -*- encoding: utf-8 -*-
from django import forms

mis_errores = {
    'required': 'Este campo es obligatorio'
}

class LoginForm(forms.Form):

    user = forms.CharField(max_length=80,
                           widget=forms.TextInput(attrs={'class':'form-control', 'placeholder':'Usuario', 'id':"inputUser"}),
                           error_messages=mis_errores)

    password = forms.CharField(max_length=80,
                               widget=forms.PasswordInput(attrs={'class':'form-control', 'placeholder':'Contraseña', 'id':"inputPswd"}),
                               error_messages=mis_errores)
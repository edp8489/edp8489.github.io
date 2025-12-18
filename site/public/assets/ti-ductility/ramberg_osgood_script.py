
from math import log10, pow
import numpy as np
import matplotlib.pyplot as plt

def calcROexponent(fty,ftu,epu):
    n = (log10(epu) - log10(0.002))/(log10(ftu) - log10(fty))
    return n

# functions for generating Ramberg-Osgood derived stress-strain curve
def ROStrain(s, E, Fpl, Fty,n):
    # elastic strain at stress s
    e_el = s/E
    # elastic strain at proportional limit
    e_el_prop = Fpl/E
    # if strain is less than epl, total strain = elastic strain
    if e_el < e_el_prop:
        ep = 0
    else:
    # else return total strain = elastic + plastic based on RO relationship
        ep = + 0.002*pow((s/Fty),n)
    
    etot = e_el + ep
    return etot
# end

# A286
Fty_a286 = 120.0 # ksi
Ftu_a286 = 160.0 # ksi
epu_a286 = 0.07 # plastic strain at ultimate, in/in

# Ti 6-4
Fty_ti64 = 150.0 # ksi
Ftu_ti64 = 160.0 # ksi
epu_ti64 = 0.01 # plastic strain at ultimate, in/in

# calculate Ramberg-Osgood exponent, n
n_ro_a286 = calcROexponent(Fty_a286, Ftu_a286, epu_a286)
m_a286 = pow(n_ro_a286,-1)
n_ro_ti64 = calcROexponent(Fty_ti64, Ftu_ti64, epu_ti64)
m_ti64 = pow(n_ro_ti64,-1)

print('A286 Fty = {:.0f} ksi; Ftu = {:.0f} ksi; epu = {:.3f} in/in'.format(Fty_a286, Ftu_a286, epu_a286))
print('A286 Ramberg-Osgood exponent n = {:.2f}'.format(n_ro_a286))
print('A286 strain-hardening exponent (1/n) = m = {:.2f}'.format(m_a286))
print('')
print('Ti 6Al-4V Fty = {:.0f} ksi; Ftu = {:.0f} ksi; epu = {:.3f} in/in'.format(Fty_ti64, Ftu_ti64, epu_ti64))
print('Ti 6Al-4V Ramberg-Osgood exponent n = {:.2f}'.format(n_ro_ti64))
print('Ti 6Al-4V strain-hardening exponent (1/n) = m = {:.2f}'.format(m_ti64))

# create vector of stress values from 0 to 160 ksi with 0.1 ksi steps
svec = np.arange(0,160000+1,100)

e_RO_a286 = np.array([ROStrain(s, 29e6, 90000 , 120000, n_ro_a286) for s in svec])
e_RO_ti64 = np.array([ROStrain(s, 16e6, 120000 , 150000, n_ro_ti64) for s in svec])

plt.figure()
plt.plot(e_RO_a286,svec)
plt.xlim((0.0,0.1))
plt.ylim((0,180000))
plt.grid(which="both")
plt.xlabel("Engineering Strain [in/in]")
plt.ylabel("Engineering Stress (psi)")
plt.title("A286 Ramberg-Osgood Stress-Strain Curve")

plt.figure()
plt.plot(e_RO_ti64,svec)
plt.xlim((0.0,0.04))
plt.ylim((0,180000))
plt.grid(which="both")
plt.xlabel("Engineering Strain [in/in]")
plt.ylabel("Engineering Stress (psi)")
plt.title("Ti 6Al-4V Ramberg-Osgood Stress-Strain Curve")

plt.show()

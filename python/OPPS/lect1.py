class Computer :
    
    def __init__(self,cpu,ram,storage):
        self.cpu = cpu
        self.ram = ram
        self.storage = storage
            
    def config(self):
        print("i5 16gb 1TB")


c1 = Computer("i3","1gb","100gb")
c2 = Computer("i5","8gb","1Tb")
c3 = Computer("i7","16gb","100 Tb")


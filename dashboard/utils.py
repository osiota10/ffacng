from django.conf import settings
import uuid
from .models import *

# Generate Profile ID


def generate_ref_code():
    code = str(uuid.uuid4()).replace("-", "")[:12]
    return code


# Generate Payment Pin
def generate_payment_pin():
    pin = str(uuid.uuid4()).replace("-", "")[:5]
    return pin

# MLMSystem
# class Member:
#     def __init__(self, name, level):
#         self.name = name
#         self.level = level
#         self.referrals = []
#         self.match_bonus = 0

#     def add_referral(self, referral):
#         self.referrals.append(referral)

#     def calculate_match_bonus(self):
#         if len(self.referrals) >= 2:
#             left_child = self.referrals[0]
#             right_child = self.referrals[1]
#             self.match_bonus += min(left_child.level, right_child.level) * 100
#             left_child.calculate_match_bonus()
#             right_child.calculate_match_bonus()


# class MLMSystem:
#     def __init__(self):
#         self.root_member = Member("Root", 0)
#         self.member_dict = {"Root": self.root_member}

#     def add_member(self, name, referrer_name):
#         referrer = self.member_dict[referrer_name]
#         level = referrer.level + 1
#         if level <= 9:
#             member = Member(name, level)
#             referrer.add_referral(member)
#             self.member_dict[name] = member
#         else:
#             print("Binary tree depth limit exceeded.")

#     def calculate_match_bonuses(self):
#         self.root_member.calculate_match_bonus()
#         for name, member in self.member_dict.items():
#             print(f"{name}: {member.match_bonus}")


# Let's go through the code in more detail:

# The Member class represents a member of the MLM system. It has a name, a level (which represents the depth in the binary tree), a list of referrals, and a match_bonus (which starts at 0).
# The add_referral method adds a new referral to the member's list of referrals.
# The calculate_match_bonus method calculates the member's match bonus based on the levels of their left and right children (if they have any). It recursively calculates the match bonuses of the left and right children as well.
# The MLMSystem class represents the MLM system itself. It has a root_member (which is the member at the root of the binary tree) and a member_dict (which is a dictionary that maps member names to Member objects).
# The add_member method adds a new member to the MLM system. It takes a name and a referrer_name as arguments. It finds the referrer member using the member_dict, and creates a new Member object with a level that is one more than the referrer's level. If the new member's level exceeds 9, it prints an error message.
# The calculate_match_bonuses method calculates the match bonuses for all members in the MLM system. It starts with the root_member and recursively calculates the match bonuses of all members. It then prints the match bonuses for all members.


# MLMSystem
class User:
    def __init__(self, name, parent=None):
        self.name = name
        self.referral_bonus = 0
        self.match_bonus = 0
        self.parent = parent
        self.left_child = None
        self.right_child = None
        self.depth = 0
        if parent:
            self.depth = parent.depth + 1
            if not parent.left_child:
                parent.left_child = self
            else:
                parent.right_child = self

    def __str__(self):
        return f"{self.name} (referral bonus: {self.referral_bonus}, match bonus: {self.match_bonus})"

    def add_referral_bonus(self, amount):
        self.referral_bonus += amount

    def add_match_bonus(self, amount):
        self.match_bonus += amount

    def get_downlines(self):
        downlines = []
        if self.left_child:
            downlines.append(self.left_child)
            downlines += self.left_child.get_downlines()
        if self.right_child:
            downlines.append(self.right_child)
            downlines += self.right_child.get_downlines()
        return downlines


class MLMSystem:
    def __init__(self):
        self.root = User("root")

    def add_user(self, name, parent_name):
        parent = self.find_user(parent_name, self.root)
        user = User(name, parent)
        self.update_match_bonus(user)

    def find_user(self, name, current_user):
        if current_user.name == name:
            return current_user
        if current_user.left_child:
            found_user = self.find_user(name, current_user.left_child)
            if found_user:
                return found_user
        if current_user.right_child:
            found_user = self.find_user(name, current_user.right_child)
            if found_user:
                return found_user
        return None

    def update_match_bonus(self, user):
        if user.depth > 9:
            return
        downlines = user.get_downlines()
        total_referral_bonus = sum(
            downline.referral_bonus for downline in downlines)
        user.add_match_bonus(total_referral_bonus)
        if user.parent:
            self.update_match_bonus(user.parent)

    def add_referral_bonus(self, name, amount):
        user = self.find_user(name, self.root)
        user.add_referral_bonus(amount)
        self.update_match_bonus(user)

    def print_binary_tree(self):
        self._print_binary_tree(self.root)

    def _print_binary_tree(self, user, level=0):
        if user:
            self._print_binary_tree(user.right_child, level + 1)
            print("    " * level, user)
            self._print_binary_tree(user.left_child, level + 1)


mlm_system_test = MLMSystem()
mlm_system_test.add_user('Osiota', 'ffcng')
mlm_system_test.add_user('Terry', 'ffcng')

tree = mlm_system_test.print_binary_tree()
print(tree)

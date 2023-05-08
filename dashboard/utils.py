from django.conf import settings
import uuid

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

# First Case
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

        # if parent:
        #     self.depth = parent.depth + 1
        #     if not parent.left_child:
        #         parent.left_child = self
        # else:
        #     parent.right_child = self

    def __str__(self):
        return f"{self.name} (referral bonus: {self.referral_bonus}, match bonus: {self.match_bonus})"

    def add_referral_bonus(self, amount):
        self.referral_bonus += amount

    def add_match_bonus(self, amount):
        self.match_bonus += amount


class MLMSystem:
    def __init__(self, users):
        self.root = User(users[0])
        self.users = {users[0]: self.root}

        for user in users[1:]:
            self.add_user(user[0], user[1])

    def add_user(self, name, parent_name):
        if name in self.users:
            raise ValueError(f"User '{name}' already exists")

        parent = self.users.get(parent_name)
        if not parent:
            raise ValueError(f"Parent user '{parent_name}' not found")

        new_user = User(name, parent=parent)

        if not parent.left_child:
            parent.left_child = new_user
        elif not parent.right_child:
            parent.right_child = new_user
        else:
            # find the leftmost available position in the bottom row
            queue = [parent.left_child, parent.right_child]
            while queue:
                node = queue.pop(0)
                if not node.left_child:
                    node.left_child = new_user
                    break
                elif not node.right_child:
                    node.right_child = new_user
                    break
                queue.append(node.left_child)
                queue.append(node.right_child)

        new_user.depth = parent.depth + 1
        self.users[name] = new_user

        # update match bonus for the new user and its parents
        # self.update_match_bonus(new_user)

    # def update_match_bonus(self, user):
    #     if user.depth > 9:
    #         return
    #     downlines = user.get_downlines()
    #     total_referral_bonus = sum(
    #         downline.referral_bonus for downline in downlines)
    #     user.add_match_bonus(total_referral_bonus)
    #     if user.parent:
    #         self.update_match_bonus(user.parent)

    # def add_referral_bonus(self, name, amount):
    #     user = self.find_user(name, self.root)
    #     user.add_referral_bonus(amount)
    #     self.update_match_bonus(user)

    def find_user(self, name, node=None):
        if not node:
            node = self.root

        if node.name == name:
            return node

        if node.left_child:
            result = self.find_user(name, node.left_child)
            if result:
                return result

        if node.right_child:
            result = self.find_user(name, node.right_child)
            if result:
                return result
        return None

    def find_depth(self, name, node=None, depth=0):
        # user = self.find_user(name)
        if not node:
            node = self.root

        if node.name == name:
            return depth

        if node.left_child:
            result = self.find_depth(name, node.left_child, depth + 1)
            if result is not None:
                return result

        if node.right_child:
            result = self.find_depth(name, node.right_child, depth + 1)
            if result is not None:
                return result

        return None

    def print_binary_tree(self):
        self._print_binary_tree(self.root)

    def print_individual_binary_tree(self, name):
        user = self.find_user(name)
        self._print_binary_tree(user)

    def _print_binary_tree(self, user, level=0):
        if user:
            if user.right_child:
                self._print_binary_tree(user.right_child, level + 1)
            print("    " * level, user)
            if user.left_child:
                self._print_binary_tree(user.left_child, level + 1)

    def get_downline_by_depth(self, name):
        user = self.users.get(name)
        if not user:
            return None

        downline = []
        level = [user]
        while level:
            next_level = []
            for node in level:
                downline.append(node.name)
                if node.left_child:
                    next_level.append(node.left_child)
                if node.right_child:
                    next_level.append(node.right_child)
            level = next_level
        return downline

    def find_user_depth(self, name):
        user = self.find_user(name)
        if not user:
            return None

        levels = {}
        self._calculate_levels(user, 0, levels)
        return max(levels.values())

    def _calculate_levels(self, node, level, levels):
        levels[node.name] = level
        if node.left_child:
            self._calculate_levels(node.left_child, level + 1, levels)
        if node.right_child:
            self._calculate_levels(node.right_child, level + 1, levels)

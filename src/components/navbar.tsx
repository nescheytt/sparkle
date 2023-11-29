import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components"

import MaxWidthWrapper from "@/components/max-width-wrapper"
import { buttonVariants } from "@/components/ui/button"
// import UserAccountNav from '@/components/user-account-nav'
// import MobileNav from '@/components/mobile-nav'

const Navbar = () => {
  const { getUser } = getKindeServerSession()
  const user = getUser()

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span>sparkle.</span>
          </Link>

          {/* <MobileNav isAuth={!!user} /> */}

          <div className="hidden items-center space-x-4 sm:flex">
            {/* {!user ? ( */}
            <>
              <Link
                href="/pricing"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Pricing
              </Link>
              <LoginLink
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Sign in
              </LoginLink>
              <RegisterLink
                className={buttonVariants({
                  size: "sm",
                })}
              >
                Get started <ArrowRight className="ml-1.5 h-5 w-5" />
              </RegisterLink>
            </>
            {/* ) : (
              <>
                <Link
                  href='/dashboard'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Dashboard
                </Link>

                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? 'Your Account'
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ''}
                  imageUrl={user.picture ?? ''}
                />
              </>
            )} */}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
